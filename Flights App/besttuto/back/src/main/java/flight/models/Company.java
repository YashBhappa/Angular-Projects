/**
 * 
 */
package flight.models;

import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;

import flight.enumerations.CompanyName;

/**
 * @author BestTutorials
 *
 */
@Entity
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idCompany;
	
	@Column(name = "company_name")
	@Enumerated(EnumType.STRING)
	private CompanyName companyName;
	
	@ElementCollection
	@CollectionTable(name = "cabin_details", joinColumns = @JoinColumn(name = "company_id"))
	private Set<CabinDetail> cabinDetails;

	@ElementCollection
	@CollectionTable(name = "inflight_infos", joinColumns = @JoinColumn(name = "company_id"))
	private Set<InflightInfo> inflightInfos;

	/**
	 * @return the idCompany
	 */
	public int getIdCompany() {
		return idCompany;
	}

	/**
	 * @param idCompany the idCompany to set
	 */
	public void setIdCompany(int idCompany) {
		this.idCompany = idCompany;
	}

	/**
	 * @return the companyName
	 */
	public CompanyName getCompanyName() {
		return companyName;
	}

	/**
	 * @param companyName the companyName to set
	 */
	public void setCompanyName(CompanyName companyName) {
		this.companyName = companyName;
	}



	/**
	 * @return the cabinDetails
	 */
	public Set<CabinDetail> getCabinDetails() {
		return cabinDetails;
	}

	/**
	 * @param cabinDetails the cabinDetails to set
	 */
	public void setCabinDetails(Set<CabinDetail> cabinDetails) {
		this.cabinDetails = cabinDetails;
	}

	/**
	 * @return the inflightInfos
	 */
	public Set<InflightInfo> getInflightInfos() {
		return inflightInfos;
	}

	/**
	 * @param inflightInfos the inflightInfos to set
	 */
	public void setInflightInfos(Set<InflightInfo> inflightInfos) {
		this.inflightInfos = inflightInfos;
	}

	/**
	 * 
	 */
	public Company() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param idCompany
	 * @param companyName
	 * @param flights
	 * @param cabinDetails
	 * @param inflightInfos
	 */
	public Company(int idCompany, CompanyName companyName, Set<CabinDetail> cabinDetails,
			Set<InflightInfo> inflightInfos) {
		super();
		this.idCompany = idCompany;
		this.companyName = companyName;
		this.cabinDetails = cabinDetails;
		this.inflightInfos = inflightInfos;
	}
	
	

}
