import {
    NewPatient,
    Gender,
    NewEntry,
    SickLeave,
    HealthCheckRating,
    Discharge,
    Diagnosis
  } from './types';

const parseGender = (gender: any): Gender => {
	if(!gender || !isGender(gender)) {
		throw new Error(`Incorrect or missing gender: ${gender}`);
	}
	return gender;
};

const parseOccupation = (occupation: any): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error(`Incorrect or missing occupation: ${occupation}`);
	}
	return occupation;
};


const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }
  return ssn;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};


export const toNewPatient = (object: any): NewPatient => {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
  };
  

  export const toNewEntry = (object: any): NewEntry => {
    const baseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };

  
    const type = parseType(object.type);

    switch (type) {
    case "HealthCheck":
      return {
      ...baseEntry,
      type:"HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.HealthCheckRating)
      };  
      case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(object.discharge)
      }
      case "OccupationalHealthcare":
        return {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseEmployerName(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave)
        };
    default:
      throw new Error("Unhandled discriminated union member: " + type);
    }
  };



const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing criteria: ${criteria}`);
  }
  return criteria;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing date: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> | undefined => {
  if (!codes || !Array.isArray(codes)) {
    return [];
  }


  codes.map((c: any) => {
    if (!isString(c)) {
      throw new Error(`Incorrect diagnosiscode: ${c}`);
    }
  });
  return codes;
};
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error(`Incorrect or missing Discharge: ${discharge}`);
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  };
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing employer name: ${name}`);
  }
  return name;
};



const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (isNaN(rating) || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};


const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseType = (type: any):  "Hospital" | "OccupationalHealthcare" | "HealthCheck" => { 
  if (!type || !isString(type) || type !== "Hospital" && type !== "OccupationalHealthcare" && type !== "HealthCheck") {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};



