export type userItem = {
  id: number,
  workNumber:string,
  password:string,
  name:string,
  avatarUrl:string,
  postId:number,
  departmentId:number,
  lineId:number,
  createTime: Date,
  updateTime: Date,
}

export type lineItem = {
  id: number,
  title: string,
  directorId: number,
  createTime: Date,
  updateTime: Date,
}

export type departmentItem = {
  id: number,
  title: string,
  createTime: Date,
  updateTime: Date,
}

export type postItem = {
  id: number,
  title: string,
  createTime: Date,
  updateTime: Date,
}
