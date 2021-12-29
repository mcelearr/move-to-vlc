const Footer = () => (
  <div className="mt-8">
    <p className="font-light mb-4 text-xs">
      The information provided on this website does not, and is not intended to,
      constitute legal advice; instead, all information, content, and materials
      available on this site are for general informational purposes only.
    </p>
    <div className="flex justify-between mb-8">
      <a target="_blank" href="https://twitter.com/RMcElearney">
        © {new Date().getFullYear()} Rory McElearney
      </a>
      <a target="_blank" href="/privacy-policy">
        Privacy Policy
      </a>
    </div>
  </div>
);

export default Footer;
