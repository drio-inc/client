type TableRow = {
  [key: string]: any;
};

interface ModalMeta {
  [name: string]: any;
}

type Modal = {
  id: string;
  open: boolean;
  meta?: ModalMeta;
};

type ModalMap = {
  [id: string]: Modal;
};
