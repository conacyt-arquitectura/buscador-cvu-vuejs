<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alertType"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="dismissCountDown = $event"
    >
      <slot name="message" v-bind:cvu="searchedKey">{{ alertMessage }}</slot>
    </b-alert>
    <form v-on:submit.prevent="search()" role="search">
      <div class="form-group"></div>
      <input
        type="search"
        id="cvu-search"
        name="cvu-search"
        v-model.trim="searchKey"
      />
      <span>&nbsp;</span>
      <button
        type="submit"
        id="cvu-search-button"
        class="btn btn-primary"
        :disabled="searchButtonDisabled()"
      >
        <font-awesome-icon
          icon="search"
          v-if="!isSearching"
        ></font-awesome-icon>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-else
        ></span>
        <span v-if="!isSearching">
          &nbsp;
          {{ $t("buscadorCvu.search") }}
        </span>
        <span v-else>
          &nbsp;
          {{ $t("buscadorCvu.searching") }}
        </span>
      </button>
    </form>
  </div>
</template>

<script lang="ts" src="./buscador-cvu.component.ts"></script>
