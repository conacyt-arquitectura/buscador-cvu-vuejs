'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var fontawesomeSvgCore = require('@fortawesome/fontawesome-svg-core');
var faSearch = require('@fortawesome/free-solid-svg-icons/faSearch');
var vueFontawesome = require('@fortawesome/vue-fontawesome');
var bAlert = _interopDefault(require('bootstrap-vue/es/components/alert/alert'));
var vuePropertyDecorator = require('vue-property-decorator');
var axios = _interopDefault(require('axios'));

var buscadorCvu = {
	search: "Search",
	searching: "Searching",
	notFound: "The person with cvu {cvu} was not found"
};
var i18nEn = {
	buscadorCvu: buscadorCvu
};

var buscadorCvu$1 = {
	search: "Buscar",
	searching: "Buscando",
	notFound: "No se encontró a la persona con cvu {cvu}"
};
var i18nEs = {
	buscadorCvu: buscadorCvu$1
};

var CvuService =
/** @class */
function () {
  function CvuService(baseApiUrl) {
    this.baseApiUrl = baseApiUrl || 'services/cvu/api';
  }

  CvuService.prototype.retrieveByCvu = function (cvu) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this.baseApiUrl + '/cvu/' + cvu).then(function (res) {
        resolve(res.data);
      }).catch(function (err) {
        reject(err);
      });
    });
  };

  CvuService.prototype.retrieveByRcea = function (rcea) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this.baseApiUrl + '/rcea/' + rcea).then(function (res) {
        resolve(res.data);
      }).catch(function (err) {
        return reject(err);
      });
    });
  };

  CvuService.prototype.retrieveByReniecyt = function (numeroReniecyt) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this.baseApiUrl + '/reniecyt/' + numeroReniecyt).then(function (res) {
        resolve(res.data);
      }).catch(function (err) {
        reject(err);
      });
    });
  };

  CvuService.prototype.retrieveByLogin = function (correoUsuario) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this.baseApiUrl + '/personas/' + correoUsuario).then(function (res) {
        resolve(res.data);
      }).catch(function (err) {
        return reject(err);
      });
    });
  };

  return CvuService;
}();

fontawesomeSvgCore.library.add(faSearch.faSearch); // agrega el icono de lupa

var Options =
/** @class */
function () {
  function Options(host) {
    this.host = host;
  }

  return Options;
}();
var defaultConfig = new Options();

var BuscadorCvu =
/** @class */
function (_super) {
  tslib.__extends(BuscadorCvu, _super);

  function BuscadorCvu() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.dismissCountDown = 0;
    _this.alertType = '';
    _this.alertMessage = null;
    _this.searchKey = '';
    _this.searchedKey = ''; // Used to show alert message

    _this.isSearching = false;
    return _this;
  }

  BuscadorCvu.prototype.created = function () {
    this.initI18n();
  };

  Object.defineProperty(BuscadorCvu.prototype, "options", {
    get: function get() {
      return this.$CVU_SEARCHER_DEFAULT_OPTIONS || defaultConfig;
    },
    enumerable: true,
    configurable: true
  });

  BuscadorCvu.prototype.search = function () {
    var _this = this;

    if (this.searchKey) {
      this.isSearching = true;
      this.dismissCountDown = 0;
      new CvuService(this.options.host).retrieveByCvu(this.searchKey).then(function (pf) {
        _this.searchedKey = _this.searchKey + '';

        _this.$emit('input', pf);

        _this.searchKey = '';
        _this.isSearching = false;
      }).catch(function () {
        _this.$emit('input', null);

        _this.searchedKey = _this.searchKey + '';
        _this.alertType = 'warning';
        _this.alertMessage = _this.$t('buscadorCvu.notFound', {
          cvu: _this.searchedKey
        });
        _this.dismissCountDown = 5;
        _this.isSearching = false;
      });
    }
  };

  BuscadorCvu.prototype.searchButtonDisabled = function () {
    return !this.searchKey || this.isSearching;
  };

  BuscadorCvu.prototype.initI18n = function () {
    if (this.$i18n) {
      this.$i18n.mergeLocaleMessage('es', i18nEs);
      this.$i18n.mergeLocaleMessage('en', i18nEn);
    }
  };

  tslib.__decorate([vuePropertyDecorator.Prop()], BuscadorCvu.prototype, "value", void 0);

  BuscadorCvu = tslib.__decorate([vuePropertyDecorator.Component({
    components: {
      'font-awesome-icon': vueFontawesome.FontAwesomeIcon,
      'b-alert': bAlert
    }
  })], BuscadorCvu);
  return BuscadorCvu;
}(vuePropertyDecorator.Vue);

/* script */
var __vue_script__ = BuscadorCvu;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('b-alert', {
    attrs: {
      "show": _vm.dismissCountDown,
      "dismissible": "",
      "variant": _vm.alertType
    },
    on: {
      "dismissed": function dismissed($event) {
        _vm.dismissCountDown = 0;
      },
      "dismiss-count-down": function dismissCountDown($event) {
        _vm.dismissCountDown = $event;
      }
    }
  }, [_vm._t("message", [_vm._v(_vm._s(_vm.alertMessage))], {
    "cvu": _vm.searchedKey
  })], 2), _vm._v(" "), _c('form', {
    attrs: {
      "role": "search"
    },
    on: {
      "submit": function submit($event) {
        $event.preventDefault();
        return _vm.search();
      }
    }
  }, [_c('div', {
    staticClass: "form-group"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: _vm.searchKey,
      expression: "searchKey",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "search",
      "id": "cvu-search",
      "name": "cvu-search"
    },
    domProps: {
      "value": _vm.searchKey
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.searchKey = $event.target.value.trim();
      },
      "blur": function blur($event) {
        return _vm.$forceUpdate();
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v(" ")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    attrs: {
      "type": "submit",
      "id": "cvu-search-button",
      "disabled": _vm.searchButtonDisabled()
    }
  }, [!_vm.isSearching ? _c('font-awesome-icon', {
    attrs: {
      "icon": "search"
    }
  }) : _c('span', {
    staticClass: "spinner-border spinner-border-sm",
    attrs: {
      "role": "status",
      "aria-hidden": "true"
    }
  }), _vm._v(" "), !_vm.isSearching ? _c('span', [_vm._v("\n         \n        " + _vm._s(_vm.$t("buscadorCvu.search")) + "\n      ")]) : _c('span', [_vm._v("\n         \n        " + _vm._s(_vm.$t("buscadorCvu.searching")) + "\n      ")])], 1)])], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "buscador-cvu.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */

/* style inject SSR */


var BuscadorCvuComponent = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__);

var Domicilio =
/** @class */
function () {
  function Domicilio(direccion, tipo) {
    this.direccion = direccion;
    this.tipo = tipo;
  }

  return Domicilio;
}();

var EntidadFederativa =
/** @class */
function () {
  function EntidadFederativa(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  return EntidadFederativa;
}();

var Institucion =
/** @class */
function () {
  function Institucion(nombre, localidad, municipio, clave, entidadFederativa) {
    this.nombre = nombre;
    this.localidad = localidad;
    this.municipio = municipio;
    this.clave = clave;
    this.entidadFederativa = entidadFederativa;
  }

  return Institucion;
}();

var PersonaFisica =
/** @class */
function () {
  function PersonaFisica(cvu, curp, titulo, nombre, apellidoPaterno, apellidoMaterno, rfc, genero, correo, login, gradoAcademico, nivelsni, instituciones, domicilios, paisResidencia, rcea) {
    this.cvu = cvu;
    this.curp = curp;
    this.titulo = titulo;
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.rfc = rfc;
    this.genero = genero;
    this.correo = correo;
    this.login = login;
    this.gradoAcademico = gradoAcademico;
    this.nivelsni = nivelsni;
    this.instituciones = instituciones;
    this.domicilios = domicilios;
    this.paisResidencia = paisResidencia;
    this.rcea = rcea;
  }

  return PersonaFisica;
}();

var index = {
  install: function install(Vue, globalOptions) {
    var options = tslib.__assign(tslib.__assign({}, defaultConfig), globalOptions);

    Vue.prototype.$CVU_SEARCHER_DEFAULT_OPTIONS = options;
    Vue.component('buscador-cvu', BuscadorCvuComponent);
  }
};

exports.BuscadorCvuComponent = BuscadorCvuComponent;
exports.Domicilio = Domicilio;
exports.EntidadFederativa = EntidadFederativa;
exports.Institucion = Institucion;
exports.PersonaFisica = PersonaFisica;
exports.default = index;
//# sourceMappingURL=index.js.map
