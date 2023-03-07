export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      canciones: {
        Row: {
          author: string
          created_at: string | null
          id: number
          message: Json
          profilePicture: string | null
          title: string | null
          username: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          id?: number
          message: Json
          profilePicture?: string | null
          title?: string | null
          username?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          id?: number
          message?: Json
          profilePicture?: string | null
          title?: string | null
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
