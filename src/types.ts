export enum SERVICE_TYPE {
  SERVICES = "Services",
  NOMAD_WAITING_LIST = "Nomad Visa Waiting List",
}

export interface AdvisorFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  location: string;
  residence: string;
  services: string[];
  job: string;
  comments: string;
}

export interface WaitingListFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AdvisorRequest {
  body: AdvisorFormValues & {
    advisorType: SERVICE_TYPE.SERVICES;
  };
}

export interface WaitingListRequest {
  body: WaitingListFormValues & {
    advisorType: SERVICE_TYPE.NOMAD_WAITING_LIST;
  };
}
