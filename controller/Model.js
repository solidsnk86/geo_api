import { supabase } from '../utils/supabase.js'

export class SupabaseDB {
  static async getData({ table, column }) {
    try {
      const { data, error } = await supabase.from(table).select(column)
      if (error) throw new Error(`Error to get data from DB: ${error.message}`)
      return data
    } catch (err) {
      console.error(err)
    }
  }

  static async sendData({ table, content }) {
    try {
      const { error } = await supabase.from(table).insert([content])

      if (error) throw new Error(`Cannot send data to DB, ${error.message}`)
      return { message: 'Data inserted successfully' }
    } catch (err) {
      console.error(err)
    }
  }

  static async getVisits({ table, column }, limit) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(column)
        .limit(limit)
      if (error) throw new Error(`Cannot get data from DB, ${error.message}`)
      return data
    } catch (err) {
      console.error(err)
    }
  }

  static async update(id, { content }) {
    try {
      const { error } = await supabase
        .from('portfolio_comments')
        .update(content)
        .match(id)

      if (error) throw new Error(`Error to update content: ${error.message}`)
      return { message: 'Data updated successfully' }
    } catch (err) {
      console.error(err)
    }
  }

  static async delete(id, column) {
    try {
      const { error } = await supabase.from(column).delete().eq('id', id)

      if (error) {
        throw new Error(`Error to delete row: ${error.message}`)
      }
      return { message: 'Row deleted successfully' }
    } catch (err) {
      console.error(err)
    }
  }
}
