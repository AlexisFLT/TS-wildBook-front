
export interface ISkillFromAPI {
    id: number; 
    name: string;
    grades: IGradeFromAPI  
}
    
export interface IGradeFromAPI {
    grade: number;
    skill: ISkillFromAPI;    
}
    
export interface IWilderFromAPI {
    name: string;  
    id: number;
    city: string;
    grades: IGradeFromAPI[];
}


export interface ISkillProps {
    title: string;
    votes: number;
    id: number
}

export interface IWilderProps {
    name: string;
    id: number;
    city: string
    skills: ISkillProps[];

  }   

export interface IFormInput {
    name: string;
    city: string;
    grades: {
      skill: {
        id: number;
        name: string;
      };
      grade: number;
    };
  }
    
    
    
    