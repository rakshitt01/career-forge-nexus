export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          project_id: string | null
          resume_url: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          project_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_time: string | null
          created_at: string | null
          id: string
          mentor_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_time?: string | null
          created_at?: string | null
          id?: string
          mentor_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_time?: string | null
          created_at?: string | null
          id?: string
          mentor_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      cofounders: {
        Row: {
          availability: string | null
          created_at: string | null
          id: string
          preferred_industry: string[] | null
          skills: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          id?: string
          preferred_industry?: string[] | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          id?: string
          preferred_industry?: string[] | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          likes: number | null
          tag: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          likes?: number | null
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          likes?: number | null
          tag?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          completed: boolean | null
          course_id: string | null
          created_at: string | null
          id: string
          progress_percent: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          progress_percent?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          progress_percent?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          certificate_available: boolean | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          duration: string | null
          id: string
          modules: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          certificate_available?: boolean | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          id?: string
          modules?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          certificate_available?: boolean | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          id?: string
          modules?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mentors: {
        Row: {
          availability: Json | null
          bio: string | null
          created_at: string | null
          field: string | null
          id: string
          mentor_type: string | null
          name: string
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          created_at?: string | null
          field?: string | null
          id?: string
          mentor_type?: string | null
          name: string
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          created_at?: string | null
          field?: string | null
          id?: string
          mentor_type?: string | null
          name?: string
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          college_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          graduation_year: number | null
          id: string
          interests: string[] | null
          updated_at: string | null
        }
        Insert: {
          college_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          graduation_year?: number | null
          id: string
          interests?: string[] | null
          updated_at?: string | null
        }
        Update: {
          college_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          graduation_year?: number | null
          id?: string
          interests?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: string | null
          company_name: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          posted_by: string | null
          skills_required: string[] | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget?: string | null
          company_name?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          posted_by?: string | null
          skills_required?: string[] | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget?: string | null
          company_name?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          posted_by?: string | null
          skills_required?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string | null
          education: Json | null
          experience: Json | null
          id: string
          skills: string[] | null
          updated_at: string | null
          uploaded_cv: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          education?: Json | null
          experience?: Json | null
          id?: string
          skills?: string[] | null
          updated_at?: string | null
          uploaded_cv?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          education?: Json | null
          experience?: Json | null
          id?: string
          skills?: string[] | null
          updated_at?: string | null
          uploaded_cv?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      startups: {
        Row: {
          created_at: string | null
          description: string | null
          funding_status: string | null
          id: string
          idea_title: string
          pitch_deck_url: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          funding_status?: string | null
          id?: string
          idea_title: string
          pitch_deck_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          funding_status?: string | null
          id?: string
          idea_title?: string
          pitch_deck_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_xp: {
        Row: {
          earned_from: string | null
          id: string
          timestamp: string | null
          user_id: string | null
          xp_amount: number | null
        }
        Insert: {
          earned_from?: string | null
          id?: string
          timestamp?: string | null
          user_id?: string | null
          xp_amount?: number | null
        }
        Update: {
          earned_from?: string | null
          id?: string
          timestamp?: string | null
          user_id?: string | null
          xp_amount?: number | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
