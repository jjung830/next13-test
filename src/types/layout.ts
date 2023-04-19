export interface LayoutProps {
  headMeta: { title: string; excerpt: string; ogImage: string };
  children: React.ReactNode;
  headerContent: any[];
  footerContent: any[];
}