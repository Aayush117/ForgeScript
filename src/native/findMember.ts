import noop from "../functions/noop"
import { ArgType, CompiledFunction, NativeFunction, Return } from "../structures"

export const MemberMentionCharRegex = /[<>@]/g

export default new NativeFunction({
    name: "$findMember",
    description: "Finds a member of a guild",
    brackets: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to find the member on",
            type: ArgType.Guild,
            rest: false,
            required: true
        },
        {
            name: "query",
            description: "The id, mention or name to find",
            rest: false,
            type: ArgType.String,
            required: true
        }
    ],
    unwrap: true,
    async execute(ctx, [ guild, q ]) {
        const id = q.replace(MemberMentionCharRegex, "")

        if (CompiledFunction.IdRegex.test(id)) {
            const m = await guild.members.fetch(id).catch(noop)
            if (m) Return.success(m.id)
        }

        q = q.toLowerCase()

        const query = await guild.members.search({
            query: q
        }).catch(noop)

        return Return.success(
            query ? query.at(0)?.id : undefined
        )
    },
})