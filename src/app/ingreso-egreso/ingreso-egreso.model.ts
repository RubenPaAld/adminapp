export class IngresoEgreso {
  descripcion: string;
  monto: number;
  tipo: tiposValidos;
  uid?: string;

  constructor(obj) {

    this.descripcion = obj && obj.descripcion || null;
    this.monto = obj && obj.monto || null;

    try {
      if (obj && obj.tipo >= 0) {
        this.tipo = obj.tipo;
      }  else {
        this.tipo = null;
      }
    } catch (e) {
      this.tipo = null;
    }

  }
}

export enum tiposValidos {
  ingreso, egreso
}
