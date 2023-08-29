import { ArgType, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$setGuildIcon",
    description: "Sets a guild icon, returns boolean",
    unwrap: true,
    args: [
        {
            name: "guild ID",
            rest: false,
            type: ArgType.Guild,
            required: true,
            description: "The guild to set icon on"
        },
        {
            name: "url",
            description: "The new icon",
            rest: false,
            type: ArgType.String
        }
    ],
    brackets: true,
    async execute(ctx, [ guild, icon ]) {
        return Return.success(
            await guild.setIcon(icon || null).catch(() => false) !== false
        ) 
    },
})