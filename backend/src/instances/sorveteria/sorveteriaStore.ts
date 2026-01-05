/**
 * @summary
 * In-memory store instance for Sorveteria entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/sorveteria/sorveteriaStore
 */

import { SORVETERIA_DEFAULTS, STATUS_MODERACAO } from '@/constants/sorveteria';
import {
  SorveteriaEntity,
  FotoAmbiente,
  Depoimento,
  Promocao,
  HorarioSemana,
  HorarioEspecial,
} from '@/services/sorveteria/sorveteriaTypes';

/**
 * In-memory store for Sorveteria records
 */
class SorveteriaStore {
  private sorveteria: SorveteriaEntity | null = null;
  private fotosCounter = 0;
  private depoimentosCounter = 0;
  private promocoesCounter = 0;

  /**
   * Get sorveteria information
   */
  get(): SorveteriaEntity | null {
    return this.sorveteria;
  }

  /**
   * Create or update sorveteria information
   */
  set(data: Omit<SorveteriaEntity, 'id' | 'dateCreated' | 'dateModified'>): SorveteriaEntity {
    const now = new Date().toISOString();

    if (!this.sorveteria) {
      this.sorveteria = {
        id: 1,
        ...data,
        dateCreated: now,
        dateModified: now,
      };
    } else {
      this.sorveteria = {
        ...this.sorveteria,
        ...data,
        dateModified: now,
      };
    }

    return this.sorveteria;
  }

  /**
   * Update partial sorveteria information
   */
  update(data: Partial<SorveteriaEntity>): SorveteriaEntity | null {
    if (!this.sorveteria) {
      return null;
    }

    this.sorveteria = {
      ...this.sorveteria,
      ...data,
      dateModified: new Date().toISOString(),
    };

    return this.sorveteria;
  }

  /**
   * Add environment photo
   */
  addFoto(foto: Omit<FotoAmbiente, 'id' | 'ordem'>): FotoAmbiente | null {
    if (!this.sorveteria) {
      return null;
    }

    const newFoto: FotoAmbiente = {
      ...foto,
      id: ++this.fotosCounter,
      ordem: this.sorveteria.fotosAmbiente.length + 1,
    };

    this.sorveteria.fotosAmbiente.push(newFoto);
    this.sorveteria.dateModified = new Date().toISOString();

    return newFoto;
  }

  /**
   * Remove environment photo
   */
  removeFoto(fotoId: number): boolean {
    if (!this.sorveteria) {
      return false;
    }

    const index = this.sorveteria.fotosAmbiente.findIndex((f) => f.id === fotoId);
    if (index === -1) {
      return false;
    }

    this.sorveteria.fotosAmbiente.splice(index, 1);
    this.sorveteria.dateModified = new Date().toISOString();

    return true;
  }

  /**
   * Add testimonial
   */
  addDepoimento(
    depoimento: Omit<Depoimento, 'id' | 'statusModeracao' | 'dataCriacao'>
  ): Depoimento | null {
    if (!this.sorveteria) {
      return null;
    }

    const newDepoimento: Depoimento = {
      ...depoimento,
      id: ++this.depoimentosCounter,
      statusModeracao: STATUS_MODERACAO.PENDENTE,
      dataCriacao: new Date().toISOString(),
    };

    this.sorveteria.depoimentos.push(newDepoimento);
    this.recalcularAvaliacaoMedia();

    return newDepoimento;
  }

  /**
   * Update testimonial moderation status
   */
  updateDepoimentoStatus(
    depoimentoId: number,
    status: 'pendente' | 'aprovado' | 'rejeitado'
  ): Depoimento | null {
    if (!this.sorveteria) {
      return null;
    }

    const depoimento = this.sorveteria.depoimentos.find((d) => d.id === depoimentoId);
    if (!depoimento) {
      return null;
    }

    depoimento.statusModeracao = status;
    this.recalcularAvaliacaoMedia();

    return depoimento;
  }

  /**
   * Recalculate average rating based on approved testimonials
   */
  private recalcularAvaliacaoMedia(): void {
    if (!this.sorveteria) {
      return;
    }

    const aprovados = this.sorveteria.depoimentos.filter(
      (d) => d.statusModeracao === STATUS_MODERACAO.APROVADO
    );

    if (aprovados.length === 0) {
      this.sorveteria.avaliacaoMedia = null;
      this.sorveteria.totalAvaliacoes = 0;
      return;
    }

    const soma = aprovados.reduce((acc, d) => acc + d.avaliacao, 0);
    this.sorveteria.avaliacaoMedia = parseFloat((soma / aprovados.length).toFixed(1));
    this.sorveteria.totalAvaliacoes = aprovados.length;
  }

  /**
   * Add promotion
   */
  addPromocao(promocao: Omit<Promocao, 'id' | 'ativa'>): Promocao | null {
    if (!this.sorveteria) {
      return null;
    }

    const newPromocao: Promocao = {
      ...promocao,
      id: ++this.promocoesCounter,
      ativa: true,
    };

    this.sorveteria.promocoesAtivas.push(newPromocao);
    this.sorveteria.dateModified = new Date().toISOString();

    return newPromocao;
  }

  /**
   * Remove expired promotions
   */
  removePromocoesVencidas(): number {
    if (!this.sorveteria) {
      return 0;
    }

    const hoje = new Date().toISOString().split('T')[0];
    const antes = this.sorveteria.promocoesAtivas.length;

    this.sorveteria.promocoesAtivas = this.sorveteria.promocoesAtivas.filter(
      (p) => p.dataValidade >= hoje
    );

    const removidas = antes - this.sorveteria.promocoesAtivas.length;

    if (removidas > 0) {
      this.sorveteria.dateModified = new Date().toISOString();
    }

    return removidas;
  }

  /**
   * Update operating status based on current time
   */
  updateStatusFuncionamento(): void {
    if (!this.sorveteria) {
      return;
    }

    const agora = new Date();
    const diaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'][
      agora.getDay()
    ];
    const horaAtual = `${String(agora.getHours()).padStart(2, '0')}:${String(
      agora.getMinutes()
    ).padStart(2, '0')}`;
    const dataAtual = agora.toISOString().split('T')[0];

    // Check for special hours
    const horarioEspecial = this.sorveteria.horariosEspeciais.find((h) => h.data === dataAtual);

    if (horarioEspecial) {
      if (horarioEspecial.fechado) {
        this.sorveteria.statusFuncionamento = 'fechado';
        return;
      }

      if (horarioEspecial.abertura && horarioEspecial.fechamento) {
        if (horaAtual >= horarioEspecial.abertura && horaAtual < horarioEspecial.fechamento) {
          this.sorveteria.statusFuncionamento = 'aberto';
        } else {
          this.sorveteria.statusFuncionamento = 'fechado';
        }
        return;
      }
    }

    // Check regular hours
    const horarioDia =
      this.sorveteria.horariosSemana[diaSemana as keyof typeof this.sorveteria.horariosSemana];

    if (horarioDia.fechado) {
      this.sorveteria.statusFuncionamento = 'fechado';
      return;
    }

    if (horaAtual >= horarioDia.abertura && horaAtual < horarioDia.fechamento) {
      this.sorveteria.statusFuncionamento = 'aberto';
    } else {
      this.sorveteria.statusFuncionamento = 'fechado';
    }
  }

  /**
   * Clear all data (useful for testing)
   */
  clear(): void {
    this.sorveteria = null;
    this.fotosCounter = 0;
    this.depoimentosCounter = 0;
    this.promocoesCounter = 0;
  }
}

/**
 * Singleton instance of SorveteriaStore
 */
export const sorveteriaStore = new SorveteriaStore();
