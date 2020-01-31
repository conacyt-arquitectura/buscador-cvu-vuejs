import i18nEn from "@/i18n/en/buscadorCvu.json";
import i18nEs from "@/i18n/es/buscadorCvu.json";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import bAlert from 'bootstrap-vue/es/components/alert/alert';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CvuService from './cvu.service';
import { IPersonaFisica } from './model/persona-fisica.model';
import { IVueI18n } from "vue-i18n/types/index";

library.add(faSearch); // agrega el icono de lupa

export class Options {

    constructor(
        public host?: string
    ) { }

}

let defaultConfig = new Options();
export { defaultConfig };

@Component({
    components: {
        'font-awesome-icon': FontAwesomeIcon,
        'b-alert': bAlert
    }
})
export default class BuscadorCvu extends Vue {

    @Prop()
    readonly value!: IPersonaFisica;

    public dismissCountDown = 0;
    public alertType = '';
    public alertMessage: any = null;

    public searchKey: string = '';
    public searchedKey: string = ''; // Used to show alert message
    public isSearching: boolean = false;

    created() {
        this.initI18n();
    }

    public get options(): Options {
        return (<any>this).$CVU_SEARCHER_DEFAULT_OPTIONS || defaultConfig;
    }

    public search() {
        if (this.searchKey) {
            this.isSearching = true;
            this.dismissCountDown = 0;
            new CvuService(this.options.host)
                .retrieveByCvu(this.searchKey)
                .then(pf => {
                    this.searchedKey = this.searchKey + '';
                    this.$emit('input', pf);
                    this.searchKey = '';
                    this.isSearching = false;
                })
                .catch(() => {
                    this.$emit('input', null);
                    this.searchedKey = this.searchKey + '';
                    this.alertType = 'warning';
                    this.alertMessage = this.$t('buscadorCvu.notFound', { cvu: this.searchedKey });
                    this.dismissCountDown = 5;
                    this.isSearching = false;
                });
        }
    }

    public searchButtonDisabled() {
        return !this.searchKey || this.isSearching;
    }

    private initI18n() {
        if (this.$i18n) {
            this.$i18n.mergeLocaleMessage('es', i18nEs);
            this.$i18n.mergeLocaleMessage('en', i18nEn);
        }
    }
}