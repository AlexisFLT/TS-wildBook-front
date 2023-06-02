import { Entity, Column, PrimaryGeneratedColumn, OneToMany,  } from "typeorm"
import { Grade } from "./Grade";

@Entity()
export class Wilder{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column()
  city:string;
  
  @OneToMany(() => Grade, (grade) => grade.wilder)
  public grades: Grade[]
}