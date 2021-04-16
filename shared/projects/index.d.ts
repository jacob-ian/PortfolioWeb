export declare namespace Projects {
  interface Document {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    links: Projects.Link[];
    dateStart: number;
    status: 'finished' | 'ongoing';
    dateEnd?: number;
    iconUrl?: string;
  }

  interface Link {
    name: string;
    url: string;
  }
}

export declare namespace Technologies {
  interface Document {
    id: string;
    name: string;
    projects: string[];
  }
}
