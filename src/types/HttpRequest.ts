export interface HttpRequest<B> {
  params?: any;
  header?: any;
  body: B;
}
