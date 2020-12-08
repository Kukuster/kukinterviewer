import { IIMessage } from "../../../core/Command/Command";
import { confirmableSheetMethod } from "../../../core/sheet/sheet";


export default async function suggestMethod_test_prepare(msg: IIMessage, method_and_args: [confirmableSheetMethod, string | undefined])
    : Promise<[confirmableSheetMethod, string | undefined]>
{
    console.log('suggestMethod_test.prepare');

    return method_and_args;

}
