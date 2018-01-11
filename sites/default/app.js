import setup from 'setup'
import routes from 'routes'
import 'styles/_override-config.scss'

/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/images/favicon.ico'
import '!file-loader?name=[name].[ext]!./assets/images/icon-72x72.png'
import '!file-loader?name=[name].[ext]!./assets/images/icon-96x96.png'
import '!file-loader?name=[name].[ext]!./assets/images/icon-128x128.png'
import '!file-loader?name=[name].[ext]!./assets/images/icon-144x144.png'
import '!file-loader?name=[name].[ext]!./assets/images/icon-152x152.png'
import '!file-loader?name=[name].[ext]!./assets/images/icon-192x192.png'
import '!file-loader?name=[name].[ext]!./assets/images/icon-384x384.png'
import '!file-loader?name=[name].[ext]!./assets/images/icon-512x512.png'
import '!file-loader?name=[name].[ext]!./manifest.json'
import 'file-loader?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-unresolved, import/extensions */

setup(routes)
