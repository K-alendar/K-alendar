SELECT
    "GroupMember"."group_id",
    "GroupMember"."member_id",
    "GroupMember"."createdAt",
    "GroupMember"."updatedAt",
    "member"."id" AS "member.id",
    "member"."startDate" AS "member.startDate",
    "member"."endDate" AS "member.endDate",
    "member"."company_id" AS "member.company_id",
    "member"."description" AS "member.description",
    "member"."displayName" AS "member.displayName",
    "member"."secondaryDisplayName" AS "member.secondaryDisplayName",
    "member"."isGroup" AS "member.isGroup",
    "member"."memberCount" AS "member.memberCount",
    "member"."createdAt" AS "member.createdAt",
    "member"."updatedAt" AS "member.updatedAt",
    "group"."id" AS "group.id",
    "group"."startDate" AS "group.startDate",
    "group"."endDate" AS "group.endDate",
    "group"."company_id" AS "group.company_id",
    "group"."description" AS "group.description",
    "group"."displayName" AS "group.displayName",
    "group"."secondaryDisplayName" AS "group.secondaryDisplayName",
    "group"."isGroup" AS "group.isGroup",
    "group"."memberCount" AS "group.memberCount",
    "group"."createdAt" AS "group.createdAt",
    "group"."updatedAt" AS "group.updatedAt"
FROM "GroupMembers" AS "GroupMember"
LEFT OUTER JOIN "Artists" AS "member"
    ON "GroupMember"."member_id" = "member"."id"
LEFT OUTER JOIN "Artists" AS "group"
    ON "GroupMember"."group_id" = "group"."id"
WHERE "GroupMember"."group_id" = 3;
