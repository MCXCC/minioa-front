export type userItem={
  id:number
}

export type lineItem={
  id:number,
  title:string,
  directorId:number,
  director:userItem
}
