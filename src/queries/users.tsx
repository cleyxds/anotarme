import { queryOptions } from "@tanstack/react-query"

import { getMembersToChat } from "../utils/user"

export const membersListQuery = (userId: string) =>
  queryOptions({
    queryKey: ["members"],
    queryFn: () => getMembersToChat(userId),
    staleTime: Infinity,
  })
