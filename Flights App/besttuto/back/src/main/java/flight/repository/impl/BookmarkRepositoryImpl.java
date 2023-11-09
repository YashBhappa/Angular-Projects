/**
 * 
 */
package flight.repository.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import flight.models.Bookmark;
import flight.models.Flight;
import flight.repository.BookmarkRepositoryCustom;

/**
 * @author BestTutorials
 *
 */
@Repository
public class BookmarkRepositoryImpl implements BookmarkRepositoryCustom {

	@Autowired
	private EntityManager entityManager;
	
	/* (non-Javadoc)
	 * @see flight.repository.BookmarkRepositoryCustom#getBookmarkList(java.lang.String)
	 */
	@Override
	public List<Bookmark> getBookmarkList(String userName) {
		CriteriaBuilder cbuild = entityManager.getCriteriaBuilder();
		CriteriaQuery<Bookmark> cquery = cbuild.createQuery(Bookmark.class);
		Root<Bookmark> bookmark = cquery.from(Bookmark.class);
		List<Predicate> predicates = new ArrayList<>();
		predicates.add(cbuild.equal(bookmark.get("account").get("username"), userName));
		cquery.where(predicates.toArray(new Predicate[0]));
		return entityManager.createQuery(cquery).getResultList();
	}

}
