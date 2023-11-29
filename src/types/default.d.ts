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

export type lineItem = {
  id: number,
  title: string,
  // eslint-disable-next-line no-use-before-define
  director: userItem,
  createTime: Date,
  updateTime: Date,
}

export type userItem = {
  id: number,
  workNumber: string,
  password: string,
  name: string,
  avatarUrl: string,
  post: postItem,
  department: departmentItem,
  line: lineItem,
  createTime: Date,
  updateTime: Date,
}
