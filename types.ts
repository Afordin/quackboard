export interface PageMeta {
  title: string
  description: string
  cardImage: string
}
/** @description Duck piano songs, with notes and user info */
export interface Song {
  /**
   * Format: integer
   * @description Note:
   * This is a Primary Key.<pk/>
   */
  id: number
  /**
   * Format: uuid
   * @description Supabase user ID
   */
  author: string
  /**
   * Format: jsonb
   * @description MIDI string
   */
  message: Object[]
  /**
   * Format: timestamp with time zone
   * @description When it got published
   * @default CURRENT_TIMESTAMP
   */
  created_at: string
  /**
   * Format: text
   * @description Composers' t.tv username
   */
  username: string
  /**
   * Format: text
   * @description Composers' t.tv avatar
   */
  profilePicture: string
  /**
   * Format: text
   * @description Song title
   */
  title: string
}
