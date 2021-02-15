import { UserResponse, UsersResponse, UUID } from './types/UsersResponse'
import { rest } from 'msw'

// Mock data from file
import { usersResponses } from './__data__/mock'

export const handlers = [
  rest.get<UsersResponse, string, UserListRequestParams>('/api/user-list/:number/:page', (req, res, ctx) => {
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
  rest.get<UserResponse, string, UserRequestParams>('/api/user-profile/:userUuid', (req, res, ctx) => {
    const { userUuid } = req.params
    const matchedUser = usersResponses.find((user) => user.login.uuid === userUuid)
    return res(ctx.json(matchedUser))
  }),
]

interface UserListRequestParams {
  number: string
  page: string
}

interface UserRequestParams {
  userUuid: UUID
}
