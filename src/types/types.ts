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
      facts: {
        Row: {
          category: string | null
          created_at: string | null
          id: number
          source: string | null
          text: string | null
          votesFalse: number | null
          votesInteresting: number | null
          votesMindblowing: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: number
          source?: string | null
          text?: string | null
          votesFalse?: number | null
          votesInteresting?: number | null
          votesMindblowing?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: number
          source?: string | null
          text?: string | null
          votesFalse?: number | null
          votesInteresting?: number | null
          votesMindblowing?: number | null
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
