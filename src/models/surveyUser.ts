import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'


@Entity("surveys_users")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string

  @Column()
  user_id: string

  @Column()
  survey_id: string

  @CreateDateColumn()
  created_at: Date

  @Column()
  value: number

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { SurveyUser }