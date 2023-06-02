import { Entity, Column, PrimaryGeneratedColumn, OneToMany,  } from "typeorm"
import { Grade } from "./Grade";

@Entity()
export class Skill{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @OneToMany(() => Grade, (grade) => grade.skill)
  public grades: Grade[]
  
}