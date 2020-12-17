import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Scroll, QSkeleton, QLinearProgress, QCircularProgress } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
  },
  components: { QSkeleton, QLinearProgress, QCircularProgress },
  directives: {
    Scroll
  }
})