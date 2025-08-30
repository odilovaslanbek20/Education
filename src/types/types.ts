export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  password: string
  image: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  comments: []
  likes: []
  resources: []
  receptions: []
}

export interface ApiResponse {
  data: User
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  image: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface MajorItem {
  id: number
  majorId: number
  centerId: number
  createdAt: string
  updatedAt: string
}

export interface Major {
  id: number
  name: string
  image: string
  fieldId: number | null
  subjectId: number
  majoritems: MajorItem
}

export interface Region {
  id: number
  name: string
}

export interface Filial {
  id: number
  name: string
  phone: string
  regionId: number
  centerId: number
  address: string
  image: string
  createdAt: string
  updatedAt: string
  region: Region
}

export interface Comment {
  id: number
  text: string
  star: number
  userId: number
  centerId: number
  createdAt: string
  updatedAt: string
  user: User
}

export interface Reception {
  id: number
  userId: number
  centerId: number
  filialId: number
  majorId: number
  visitDate: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Center {
  id: number
  name: string
  phone: string
  regionId: number
  address: string
  seoId: number
  image: string
  createdAt: string
  updatedAt: string
  user: User
  majors: Major[]
  region: Region
  filials: Filial[]
  comments: Comment[]
  likes: []  
  receptions: Reception[]
}

export interface CentersResponse {
  data: Center[]
  total: number
}
