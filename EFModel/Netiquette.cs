//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EFModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Netiquette
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Netiquette()
        {
            this.NetiquetteLinks = new HashSet<NetiquetteLink>();
            this.NetiquettePoints = new HashSet<NetiquettePoint>();
        }
    
        public int Id { get; set; }
        public int SchoolId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
    
        public virtual School School { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetiquetteLink> NetiquetteLinks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetiquettePoint> NetiquettePoints { get; set; }
    }
}