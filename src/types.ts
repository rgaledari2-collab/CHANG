export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  ageGroup?: string;
  instrumentType: 'keyboard' | 'string' | 'child' | 'vocal' | 'wind' | 'percussion' | 'guitar' | 'violin';
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  experienceYears: number;
  education?: string;
  stageRecords?: string[];
  pedagogy?: string;
  instruments?: string[];
  quote?: string;
  courseName?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  type: string;
  dateSolar: string;
  daySolar: string;
  description: string;
  image: string;
  location: string;
}

export interface ConsultationFormData {
  fullName: string;
  phone: string;
  course: string;
  studentAge: string;
  message: string;
}
