import styled from "styled-components"

import { useQuery } from "@tanstack/react-query"
import { useRecoilValue } from "recoil"
import { UserAtom } from "../../../atoms/User"

import { Text } from "../../../ui/atoms/Text"

import { ChatProfileImage } from "./ChatProfile"

import { Check } from "../../../assets/icons"

import { membersListQuery } from "../../../queries/users"

type MemberListProps = {
  selectedMembers: string[]
  handleSelectMember: (memberId: string) => void
}
export default function MemberList({
  selectedMembers,
  handleSelectMember,
}: MemberListProps) {
  const user = useRecoilValue(UserAtom)
  const userId = user?.id

  const { data: members } = useQuery(membersListQuery(userId!))

  const memberItemProps = {
    handleSelectMember,
  }

  return (
    <MemberContainer>
      {members?.map((member) => {
        const isMemberSelected = selectedMembers.includes(member.id)

        return (
          <MemberItem
            selected={isMemberSelected}
            key={member.id}
            {...member}
            {...memberItemProps}
          />
        )
      })}
    </MemberContainer>
  )
}

const MemberContainer = styled.ul`
  width: 100%;
`

type MemberItemProps = User & {
  handleSelectMember: (memberId: string) => void
  selected: boolean
}
function MemberItem({
  id,
  profile,
  selected,
  handleSelectMember,
}: MemberItemProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <Member selected={selected} onClick={() => handleSelectMember(id)}>
      {selected && <Check size={24} color="var(--GREEN-IX)" />}

      <ChatProfileImage src={profile.avatar_url!} alt="Profile: Image" />

      <Text as="span" size="small" type="SUISSETINTLBOLD">
        {fullName}
      </Text>
    </Member>
  )
}

type MemberProps = {
  selected: boolean
}
const Member = styled.li<MemberProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 8px;
  width: 100%;
  min-height: 40px;
  padding: 8px 0;
  border-width: 0.8px;
  border-style: solid;

  border-color: ${({ selected }) =>
    selected ? "var(--GREEN-IX)" : "transparent"};
  background-color: ${({ selected }) =>
    selected ? "var(--BLACK-I)" : "var(--WHITE-I)"};

  > span {
    color: ${({ selected }) =>
      selected ? "var(--WHITE-I)" : "var(--BLACK-I)"} !important;
  }
`
