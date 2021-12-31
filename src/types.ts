export enum EMAIL_TYPE {
  LAWYER = "LAWYER",
  GESTOR = "GESTOR",
  NOMAD_WAITING_LIST = "NOMAD_WAITING_LIST",
}

export interface AdvisorFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  advisorType: string;
  dob: string;
  gender: string;
  nationality: string;
  location: string;
  residence: string;
}

export interface WaitingListFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface LawyerRequest {
  body: {
    values: AdvisorFormValues;
    type: EMAIL_TYPE.LAWYER;
  };
}

interface GestorRequest {
  body: {
    values: AdvisorFormValues;
    type: EMAIL_TYPE.GESTOR;
  };
}

interface WaitingListRequest {
  body: {
    values: WaitingListFormValues;
    type: EMAIL_TYPE.NOMAD_WAITING_LIST;
  };
}

export type SendgridRequest =
  | LawyerRequest
  | GestorRequest
  | WaitingListRequest;
