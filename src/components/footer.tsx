export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          {/* Копирайт и права */}
          <div className="text-sm text-muted-foreground max-w-4xl mx-auto">
            <p className="mb-2">
              © 2005–{new Date().getFullYear()} ООО «Ликос». Все права защищены.
            </p>
            <p className="text-xs leading-relaxed">
              Любое использование материалов и информации с сайта (копирование,
              распространение, в т.ч. на другие сайты и интернет-ресурсы) без
              предварительного согласия правообладателя ЗАПРЕЩЕНО.
            </p>
          </div>

          {/* Реквизиты компании */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>ИНН: 6658263024</p>
            <p>ОГРН: 1076658010054</p>
            <p>КПП: 667101001</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
