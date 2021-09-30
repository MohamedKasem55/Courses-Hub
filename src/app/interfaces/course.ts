export interface Course {
        id?: string,
        title:string,
        description:string,
        image:string,
        link:string,
        requirements:string,
        category:string,
}

export interface IRate {
  userId: string,
  rate: number
}
