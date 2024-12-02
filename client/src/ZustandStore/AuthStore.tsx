import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import User from '../Types/Types'

interface IAuthStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const AuthStore = create<IAuthStore>()(
  persist(
    set => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      logout: () => set({ user: null })
    }),
    {
      name: 'LigmaBalls'
    }
  )
)

export default AuthStore
