export interface Employee {
  id: string
  name: string
  birthdate: Date
  age: number
  charge: ChargeValue
  status: StatusValue
}

export interface Charge {
  id: number
  descripcion: StatusValue
  value?: StatusValue
  label?: StatusValue
}

export interface Status {
  label: string
  value: StatusValue
}

export enum StatusValue {
  Active = 'activo',
  Inactive = 'inactivo'
}

export enum ChargeValue {
  Gerente = 'Gerente',
  Coordinador = 'Coordinador',
  Subdirector = 'Subdirector'
}
