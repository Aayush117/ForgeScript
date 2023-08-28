import { ColorResolvable } from "discord.js"
import { ArgType, NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$image",
    description: "Adds an embed image",
    unwrap: true,
    args: [
        {
            name: "url",
            description: "The url for the embed image",
            required: true,
            type: ArgType.String,
            rest: false
        },
        {
            name: "index",
            description: "The index to add this data to",
            rest: false,
            type: ArgType.Number
        }
    ],
    brackets: true,
    execute(ctx, [ image, index ]) {
        ctx.container.embed((index ?? 1) - 1).setImage(image)
        return Return.success()
    },
})