import { UserResponse, UsersResponse } from './types/UsersResponse'
import { rest } from 'msw'

// Mock data from file
import { usersResponses } from './__data__/mock'

export const handlers = [
  rest.get<UserResponse, string, UserListRequestParams>('/api/user-list/:number/:page', (req, res, ctx) => {
    const { number, page } = req.params
    return res(
      ctx.json(
        usersResponses.slice(
          parseInt(number) * (parseInt(page) - 1),
          parseInt(number) * parseInt(page),
        ) as UsersResponse,
      ),
    )
  }),
  rest.get<UserResponse, string, UserRequestParams>('/api/user-list/:index', (req, res, ctx) => {
    const { index } = req.params
    return res(ctx.json(usersResponses[parseInt(index)]))
  }),
]

interface UserListRequestParams {
  number: string
  page: string
}

interface UserRequestParams {
  index: string
}
