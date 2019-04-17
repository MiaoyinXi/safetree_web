import Vue from 'vue'
import Vuetify, {
  VApp,
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VBtn,
  VCardText,
  VCheckbox,
  VForm,
  
  VContent,
  VCard,
  VCardActions,

  VProgressLinear,

  VTimeline,
  VTimelineItem,
  VStepper,
  VStepperContent,
  VStepperStep,
  VStepperHeader,
  VIcon,
  VTextField,
  VStepperItems,
  VSpacer,
  VDialog,
  VToolbarTitle,
  VContainer,
  VLayout,
  VAlert,VFlex,
  VDivider,
  VSnackbar,

  VTabs,
  VTab,
  VTabItem,
  VDataTable
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VBtn,
    VCardText,

    VForm,
    VCheckbox,
    VContent,
    VCard,
    VCardActions,

    VProgressLinear,

    VTimeline,
    VTimelineItem,
    VStepper,
    VStepperContent,
    VStepperStep,
    VStepperHeader,
    VIcon,
    VTextField,
    VStepperItems,
    VSpacer,
    VDialog,
    VToolbarTitle,
    VContainer,
    VLayout,
    VAlert,VFlex,
    VDivider,
    VSnackbar,
    
    VTabs,
    VTab,
    VTabItem,
    VDataTable
  },
  directives: {
    Ripple
  }
})
