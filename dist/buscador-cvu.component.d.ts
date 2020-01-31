import { Vue } from 'vue-property-decorator';
import { IPersonaFisica } from './model/persona-fisica.model';
export declare class Options {
    host?: string | undefined;
    constructor(host?: string | undefined);
}
declare let defaultConfig: Options;
export { defaultConfig };
export default class BuscadorCvu extends Vue {
    readonly value: IPersonaFisica;
    dismissCountDown: number;
    alertType: string;
    alertMessage: any;
    searchKey: string;
    searchedKey: string;
    isSearching: boolean;
    created(): void;
    readonly options: Options;
    search(): void;
    searchButtonDisabled(): boolean;
    private initI18n;
}
