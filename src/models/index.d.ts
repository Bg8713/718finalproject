import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CalculationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Calculation {
  readonly id: string;
  readonly Height?: string | null;
  readonly Weight?: string | null;
  readonly BMI?: number | null;
  readonly Date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Calculation, CalculationMetaData>);
  static copyOf(source: Calculation, mutator: (draft: MutableModel<Calculation, CalculationMetaData>) => MutableModel<Calculation, CalculationMetaData> | void): Calculation;
}