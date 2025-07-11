import type { ButtonProps } from "../models/models"

export default function Button(props: ButtonProps) {

    return (
        <button onClick={props.onAction}>
            {props.text}
        </button>
    )
}