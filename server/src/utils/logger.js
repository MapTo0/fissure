
import {createLogger, format, transports} from 'winston'
const {combine, timestamp, label, prettyPrint} = format

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console()],
  exitOnError: false
})

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

export default logger
