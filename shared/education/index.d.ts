export declare namespace Qualifications {
  interface Document {
    id: string;
    name: string;
    description: string;
    dateStart: number;
    dateEnd: number;
    handbookUrl: string;
    institution: Institution;
    credentialCategory: 'degree' | 'diploma' | 'certificate';
    educationLevel: 'beginner' | 'intermediate' | 'advanced';
  }

  interface Institution {
    name: string;
    location: string;
    url: string;
    imageUrl: string;
    type: 'CollegeOrUniversity' | 'HighSchool' | 'MiddleSchool';
  }
}

export declare namespace Subjects {
  interface Document {
    id: string;
    name: string;
    handbookUrl: string;
  }
}
