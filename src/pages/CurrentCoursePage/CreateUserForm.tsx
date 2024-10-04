import { FormEventHandler, ReactElement, useState } from "react";
import { api, UserCreateDto } from "@/api";
import { H, Input, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";

interface Props {
    title?: string
}

export const CreateUserForm: React.FC<Props> = ({ title }): ReactElement => {
    const createUser = useApi(api.usersPOST);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const msgContext = useMessageContext();

    const submit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        createUser.clearError();

        // LÄGGER ENDAST TILL USER I DATABASEN. GER INTE USER EN KURS ÄN. USERFORCREATION DTO SAKNAR COURSE ID
        const [err, result] = await createUser.makeAuthRequestWithErrorResponse(
            new UserCreateDto({
                name,
                username,
                email,
                password: "Qwerty1234"
            })
        );

        if (err === null && result !== null) {
            msgContext.updateMessage(`User '${result.name}' has been created.`);
            clearInputs();
        } else {
            msgContext.updateErrorMessage(`The user was not able to be created.`)
        }
    };

    const clearInputs = () => {
        setName("");
        setUsername("");
        setEmail("");
    };

    const handleCloseForm = () => {
        createUser.clearError();
    };


    return (
        <form onSubmit={submit}
            className="w-full
            bg-indigo-100
            rounded-lg max-w-lg">
            <DefaultToastMessage onClose={handleCloseForm} />
            <H size={3} color={TextColor.DARK_X} className="mb-2">
                {title}
            </H>
            <fieldset className="flex flex-col gap-6">
                <Input
                    type="text"
                    label="Name"
                    required
                    value={name}
                    onChange={e => { setName(e.target.value); }} />
                <Input
                    type="text"
                    label="Username"
                    required
                    value={username}
                    onChange={e => { setUsername(e.target.value); }} />
                <Input
                    type="text"
                    label="E-mail"
                    required
                    value={email}
                    onChange={e => { setEmail(e.target.value); }} />
                <SubmitButton>Add</SubmitButton>
            </fieldset>
        </form>
    );
};
