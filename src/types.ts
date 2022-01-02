export enum SERVICE_TYPE {
  LAWYER = "Lawyer",
  GESTOR = "Gestor",
  NOMAD_WAITING_LIST = "Nomad Visa Waiting List",
}

export interface AdvisorFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  advisorType: SERVICE_TYPE;
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

export interface AdvisorRequest {
  body: AdvisorFormValues;
}

export interface WaitingListRequest {
  body: WaitingListFormValues;
}
